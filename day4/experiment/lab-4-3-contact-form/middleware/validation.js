const validateContact = (req, res, next) => {
    const { name, email, subject, message, phone, company } = req.body;
    const errors = [];

    // Validate name
    if (!name) {
        errors.push('Name is required');
    } else if (typeof name !== 'string') {
        errors.push('Name must be a string');
    } else if (name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    } else if (name.trim().length > 100) {
        errors.push('Name must not exceed 100 characters');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email.trim())) {
        errors.push('Invalid email format');
    }

    // Validate subject
    if (!subject) {
        errors.push('Subject is required');
    } else if (subject.trim().length < 5) {
        errors.push('Subject must be at least 5 characters long');
    } else if (subject.trim().length > 200) {
        errors.push('Subject must not exceed 200 characters');
    }

    // Validate message
    if (!message) {
        errors.push('Message is required');
    } else if (message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    } else if (message.trim().length > 1000) {
        errors.push('Message must not exceed 1000 characters');
    }

    // Validate phone (optional)
    const phoneRegex = /^[0-9]{9,10}$/;
    if (phone && !phoneRegex.test(phone.trim())) {
        errors.push('Invalid phone number format (9-10 digits required)');
    }

    // Validate company (optional)
    if (company && company.trim().length > 100) {
        errors.push('Company name must not exceed 100 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    // Sanitize data
    req.body.name = req.body.name.trim();
    req.body.email = req.body.email.trim().toLowerCase();
    req.body.subject = req.body.subject.trim();
    req.body.message = req.body.message.trim();
    if (phone) req.body.phone = req.body.phone.trim();
    if (company) req.body.company = req.body.company.trim();

    next();
};

const validateFeedback = (req, res, next) => {
    const { rating, comment, email } = req.body;
    const errors = [];

    // Validate rating
    if (rating === undefined || rating === null) {
        errors.push('Rating is required');
    } else if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        errors.push('Rating must be an integer between 1 and 5');
    }

    // Validate comment
    if (!comment) {
        errors.push('Comment is required');
    } else if (comment.trim().length < 5) {
        errors.push('Comment must be at least 5 characters long');
    } else if (comment.trim().length > 500) {
        errors.push('Comment must not exceed 500 characters');
    }

    // Validate email (optional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.trim())) {
        errors.push('Invalid email format');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    // Sanitize data
    req.body.comment = req.body.comment.trim();
    if (email) req.body.email = req.body.email.trim().toLowerCase();

    next();
};

module.exports = {
    validateContact,
    validateFeedback
};