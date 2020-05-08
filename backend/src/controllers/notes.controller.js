const notesCtrs = {};

const NoteModel = require("../models/Note");

notesCtrs.getNotes = async (req, res) => {
  const notes = await NoteModel.find();
  res.json(notes);
};

notesCtrs.createNote = async (req, res) => {
  const { title, content, author } = req.body;
  const newNote = new NoteModel({
    title: title,
    content: content,
    author: author,
  });
  await newNote.save();
  res.json({ newNote, message: "Note created" });
};

notesCtrs.getNote = async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findById(id);
  res.json(note);
};

notesCtrs.updateNote = async (req, res) => {
  const { title, content, author } = req.body;
  const id = req.params.id;

  await NoteModel.findOneAndUpdate(
    { _id: id },
    {
      title,
      content,
      author,
    }
  );
  res.json({ updateNote, message: "Note updated" });
};

notesCtrs.deleteNote = async (req, res) => {
  const id = req.params.id;
  const note = await NoteModel.findByIdAndDelete(id);
  res.json({ message: "Note delete" });
};

module.exports = notesCtrs;
