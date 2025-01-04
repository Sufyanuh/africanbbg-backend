import fs from "fs/promises";

export const validateFields =
  (model, fileFieldName = null) =>
  async (req, res, next) => {
    const schema = model.schema.obj;
    const errors = [];

    // Validate required fields from the model schema
    for (const [key, value] of Object.entries(schema)) {
      if (value.required && !req.body[key]) {
        errors.push({ field: key, message: `${key} is required` });
      }
    }

    // Check if the file field is required and missing
    if (fileFieldName && !req.file) {
      errors.push({
        field: fileFieldName,
        message: `${fileFieldName} is required`,
      });
    }

    // If errors exist, delete the uploaded file and return an error response
    if (errors.length > 0) {
      if (req.file) {
        try {
          await fs.unlink(req.file.path);
        } catch (err) {
          console.error("Failed to delete uploaded file:", err.message);
        }
      }
      return res.status(400).json({ message: "Validation errors", errors });
    }

    next();
  };
