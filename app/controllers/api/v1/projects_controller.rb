class Api::V1::ProjectsController < ApplicationController
  def index
    render json: Project.all
  end

  def create
    project = Project.create(project_params)
    render json: project
  end

  def destroy
    project = Project.find(params[:id])
    if !project.has_undone_tasks?
      project.destroy
    end
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
