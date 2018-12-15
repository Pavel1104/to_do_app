class Api::V1::ProjectsController < ApplicationController
  def index
    render json: Project.all
  end

  def create
    project = Project.create(project_params)
    render json: project
  end

  def destroy
    Project.destroy(params[:id])
  end

  def update
    project = Project.find(params[:id])
    project.update_attributes(project_params)
    render json: project
  end

  private

  def project_params
    params.require(:project).permit(:id, :name, :color)
  end
end
