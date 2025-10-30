import sql from '../configs/db.js';

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql`SELECT * FROM creations WHERE user_id=${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getPublishedCreations = async (req, res) => {
  try {
    const creations = await sql`
      SELECT * FROM creations WHERE publish=true ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`SELECT * FROM creations WHERE id=${id}`;

    if (!creation) {
      return res.json({ success: false, message: 'No such creation exists' });
    }

    const currentLikes = creation.likes;
    const userIDStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIDStr)) {
      updatedLikes = currentLikes.filter((user) => user !== userIDStr);
      message = 'Creation Unliked';
      console.log(message);
    } else {
      updatedLikes = [...currentLikes, userIDStr];
      message = 'Creation Liked';
      console.log(message);
    }

    const formatedArray = `{${updatedLikes.join(',')}}`;
    await sql`UPDATE creations SET likes=${formatedArray}::text[] WHERE id=${id}`;

    console.log(message);
    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
