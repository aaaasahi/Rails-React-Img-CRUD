import React, { useState, useEffect } from "react";
import axios from "axios";

export const ShowTodo = (props) => {
  const initialState = {
    title: "",
    text: "",
  };
  const [currentTodo, setCurrentTodo] = useState(initialState);
  const [currentFile, setCurrentFile] = useState();
  const [previewImage, setPreviewImage] = useState(undefined);
  const [labelUrl, setLabelUrl] = useState("");

  const selectFile = (e) => {
    const selectedImage = e.target.files[0];
    const setPreview = URL.createObjectURL(e.target.files[0]);
    setCurrentFile(selectedImage);
    setPreviewImage(setPreview);
  };

  const getTodo = (id) => {
    axios
      .get(`http://localhost:8000/todos/${id}`)
      .then((response) => {
        setCurrentTodo(response.data);
        setCurrentFile(response.data);
        const url = response.data.file.url;
        setLabelUrl(`http://localhost:8000/${url}`);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // params[:id]を受け取るためのもの idが変わったら実行
  useEffect(() => {
    getTodo(props.match.params.id);
  }, [props.match.params.id]);

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const createFormData = () => {
    let formData = new FormData();
    formData.append("todo[title]", currentTodo.title);
    formData.append("todo[text]", currentTodo.text);
    formData.append("todo[file]", currentFile);
    return formData;
  };

  const updateTodo = async () => {
    const url = `http://localhost:8000/todos/${currentTodo.id}`;
    const data = await createFormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      headers: JSON.parse(localStorage.user),
    };
    axios
      .patch(url, data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = () => {
    const url = `http://localhost:8000/todos/${currentTodo.id}`;
    const config = {
      headers: JSON.parse(localStorage.user),
    };
    axios
      .delete(url, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="edit-form">
        <h4>Todo</h4>
        <div className="row">
          <div className="col-8">
              <label className="btn btn-default p-0">
                <input type="file" accept="image/*" onChange={selectFile}/>
              </label>
          </div>

          {previewImage ? (
            <div>
              <img className="preview" src={previewImage} alt="" width={200} />
            </div>
          ) : (
            <div>
              <img src={labelUrl} width={200} />
            </div>
          )}
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={currentTodo.title}
              onChange={onChangeInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Text</label>
            <input
              type="text"
              className="form-control"
              id="text"
              name="text"
              value={currentTodo.text}
              onChange={onChangeInput}
            />
          </div>
        </form>
        <button className="btn btn-danger mr-2" onClick={deleteTodo}>
          Delete
        </button>
        <button type="submit" className="btn btn-primary" onClick={updateTodo}>
          Update
        </button>
      </div>
    </div>
  );
};
