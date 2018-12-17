class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy

  validates :name, presence: true
  validates :color, presence: true
  validates :color, format: { with: /\A[#]{1}[a-fA-F0-9]{6}\z/ }


  def has_undone_tasks?
    self.tasks.where(isDone: false).count > 0
  end


  private
  def self.project_with_undone_tasks_count
    projects = Project.includes(:tasks).all
    projects.map {|item|
      {
        id: item.id,
        name: item.name,
        color: item.color,
        tasks_count: item.tasks.where(isDone: false ).count,
      }
    }
  end
end
