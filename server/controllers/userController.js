import sql from '../configs/db.js';

class UserController {
  getUserCreations = async (req, res) => {
    try {
      const { userId } = req.auth;

      const creations = await sql`
        SELECT * FROM creations 
        WHERE user_id = ${userId} 
        ORDER BY created_at DESC
      `;

      res.json({ success: true, creations });
    } catch (error) {
      console.error('Get user creations error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch creations' 
      });
    }
  };

  getPublishedCreations = async (req, res) => {
    try {
      const { page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;

      const creations = await sql`
        SELECT * FROM creations 
        WHERE publish = true 
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `;

      const [{ count }] = await sql`
        SELECT COUNT(*) FROM creations WHERE publish = true
      `;

      res.json({ 
        success: true, 
        creations,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: parseInt(count),
          pages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error('Get published creations error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch published creations' 
      });
    }
  };

  toggleLikeCreation = async (req, res) => {
    try {
      const { userId } = req.auth;
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Creation ID is required'
        });
      }

      const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

      if (!creation) {
        return res.status(404).json({
          success: false,
          message: 'Creation not found'
        });
      }

      const userIDStr = userId.toString();
      const currentLikes = creation.likes || [];
      
      let updatedLikes;
      let message;

      if (currentLikes.includes(userIDStr)) {
        updatedLikes = currentLikes.filter(user => user !== userIDStr);
        message = 'Creation unliked';
      } else {
        updatedLikes = [...currentLikes, userIDStr];
        message = 'Creation liked';
      }

      await sql`
        UPDATE creations 
        SET likes = ${updatedLikes} 
        WHERE id = ${id}
      `;

      res.json({ 
        success: true, 
        message,
        likes: updatedLikes.length
      });
    } catch (error) {
      console.error('Toggle like error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to toggle like' 
      });
    }
  };
}

export default new UserController();