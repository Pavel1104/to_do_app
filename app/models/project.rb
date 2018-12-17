class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy

  validates :name, presence: true
  validates :color, presence: true
  validates :color, format: { with: /\A[#]{1}[a-fA-F0-9]{6}\z/ }


  def has_undone_tasks?
    self.tasks.where(:isDone == false).count > 0
  end
end
