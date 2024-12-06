const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Group = require('../models/Group');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Fetch all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error.message);
        res.status(500).send('Server error');
    }
});

// Join a group (by hobby)
router.post('/:hobby/join', auth, async (req, res) => {
    try {
        const group = await Group.findOne({ name: req.params.hobby });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.members.includes(req.user.id)) {
            return res.status(400).json({ message: 'You are already a member of this group' });
        }

        group.members.push(req.user.id);
        await group.save();
        res.status(200).json({ message: 'You have successfully joined the group' });
    } catch (error) {
        console.error('Error joining group:', error.message);
        res.status(500).send('Server error');
    }
});

// Check membership (by groupId)
router.get('/:groupId/membership', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const isMember = group.members.includes(req.user.id);
        res.status(200).json({ isMember });
    } catch (error) {
        console.error('Error checking membership:', error.message);
        res.status(500).send('Server error');
    }
});

// Create a new group
router.post('/', auth, async (req, res) => {
    const { name, description, hobby } = req.body;

    if (!name || !description || !hobby) {
        return res.status(400).json({ message: 'Please provide all required fields: name, description, hobby' });
    }

    try {
        const existingGroup = await Group.findOne({ hobby });
        if (existingGroup) {
            return res.status(400).json({ message: 'A group for this hobby already exists' });
        }

        const newGroup = new Group({
            name,
            description,
            hobby,
            members: [],
            owner: req.user.id,
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        console.error('Error creating group:', error.message);
        res.status(500).send('Server error');
    }
});

// Get group details and posts (by groupId)
router.get('/:groupId', async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        const posts = await Post.find({ group: req.params.groupId }).populate('user', 'name');
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json({ group, posts });
    } catch (error) {
        console.error('Error fetching group details:', error.message);
        res.status(500).send('Server error');
    }
});

// Add a new post to a group (by groupId)
router.get('/:groupId/posts', auth, async (req, res) => {
    try {
        const posts = await Post.find({ group: req.params.groupId })
            .populate('user', 'name')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'name' },
            });
        res.status(200).json(posts || []);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).send('Server error');
    }
});



// Add a comment to a post
router.post('/posts/:postId/comments', auth, async (req, res) => {
    const { comment_text } = req.body;

    try {
        const comment = new Comment({
            post: req.params.postId,
            user: req.user.id,
            comment_text,
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error.message);
        res.status(500).send('Server error');
    }
});

// Get comments for a post
router.get('/posts/:postId/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('user', 'name');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

// Add a new post to a group (by groupId)
router.post('/:groupId/posts', auth, async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Post content is required' });
    }

    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const post = new Post({
            group: req.params.groupId,
            user: req.user.id,
            content,
        });

        await post.save();

        // Populate the user field and return the post
        const populatedPost = await Post.findById(post._id).populate('user', 'name');
        res.status(201).json(populatedPost);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).send('Server error');
    }
});




// Add a comment to a post
router.post('/:groupId/posts/:postId/comments', auth, async (req, res) => {
    const { comment_text } = req.body;

    if (!comment_text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }

    try {
        // Find the post by postId
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Create a new comment
        const comment = new Comment({
            post: req.params.postId,
            user: req.user.id,
            comment_text,
        });

        // Save the comment to the database
        await comment.save();

        // Add the comment to the post's comments array
        post.comments.push(comment._id);
        await post.save();

        // Populate user data and send the response
        const populatedComment = await Comment.findById(comment._id).populate('user', 'name');
        res.status(201).json(populatedComment);
    } catch (error) {
        console.error('Error adding comment:', error.message);
        res.status(500).send('Server error');
    }
});



// Join a group by its name
router.post('/:name/join', auth, async (req, res) => {
    try {
        console.log('Received request to join group:', req.params.name);

        // Search for the group by the 'name' field
        const group = await Group.findOne({ name: req.params.name });
        console.log('Found group:', group);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Check if the user is already a member
        if (group.members.includes(req.user.id)) {
            return res.status(400).json({ message: 'You are already a member of this group' });
        }

        // Add the user to the group's members list
        group.members.push(req.user.id);
        await group.save();

        res.status(200).json({ message: 'You have successfully joined the group' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;

