class TodosController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    todos = Todo.order(updated_at: :desc)
    render json: todos
  end

  def show
    todo = Todo.find(params[:id])
    render json: todo
  end

  def create
    todo =  current_user.todos.create!(todo_params)
    render json: todo
  end

  def update
    todo = current_user.todos.find(params[:id]) 
    todo.update!(todo_params)
    render json: todo
  end

  def destroy
    todo = current_user.todos.find(params[:id])
    todo.destroy!
    render json: todo
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :text, :file).merge(user: current_user)
  end
end
