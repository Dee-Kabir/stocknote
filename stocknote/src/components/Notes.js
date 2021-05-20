import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Notes = ({value,handleBody, name}) => {
    return (
        <ReactQuill
            modules={Notes.modules}
            formats={Notes.formats}
            value={value}
            placeholder="Write your content here..."
            onChange={handleBody(name)}
            theme="snow"
            
          />
    )
}
Notes.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
      ["code-block"],
    ],
  };
  
  Notes.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block",
  ];
export default Notes;