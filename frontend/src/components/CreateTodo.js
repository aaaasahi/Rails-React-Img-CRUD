import React, { useState, useCallback } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const CreateTodo = () => {
  const initialState = {
    title: "",
    text: "",
  };
  const [todo, setTodo] = useState(initialState);
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState(undefined);
  const history = useHistory();

  const selectFile = (e) => {
    const selectedImage = e.target.files[0];
    const setPreview = URL.createObjectURL(e.target.files[0]);
    setFile(selectedImage);
    setPreviewImage(setPreview);
  };

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const createFormData = () => {
    let formData = new FormData();
    formData.append("todo[title]", todo.title);
    formData.append("todo[text]", todo.text);
    formData.append("todo[file]", file);
    return formData
  }

  const upload = async() => {
    const url = "http://localhost:8000/todos"
    const data = await createFormData()  
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      headers: JSON.parse(localStorage.user),
    }

    axios.post(url, data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="submit-form">
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" accept="image/*" onChange={selectFile} />
          </label>
        </div>

        {previewImage && (
          <div>
            <img className="preview" src={previewImage} alt="" width={200} />
          </div>
        )}
      </div>
      <>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={todo.title}
            onChange={onChangeInput}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="text">text</label>
          <input
            type="text"
            className="form-control"
            id="text"
            required
            value={todo.text}
            onChange={onChangeInput}
            name="text"
          />
        </div>

        <button onClick={upload} className="btn btn-success">
          Submit
        </button>
      </>
    </div>
  );
};
