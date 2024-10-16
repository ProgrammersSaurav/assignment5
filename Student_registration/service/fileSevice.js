export const uploadFile = (req, res) => {
  res.json({ message: 'File uploaded successfully', file: req.file.filename });
};

export const readFile = (req, res) => {
  const filePath = `uploads/${req.params.filename}`;
  res.download(filePath);
};

export const deleteFile = (req, res) => {
  const filePath = `uploads/${req.params.filename}`;
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting file' });
    res.json({ message: 'File deleted successfully' });
  });
};