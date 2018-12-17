class Task < ApplicationRecord
  belongs_to :project

  validates :name, presence: true
  validates :deadline, presence: true
  validates :project, presence: true
  validates :priority, presence: true

  before_save :default_values

  private
  def default_values
    self.isDone = isDone.presence || false
  end
end
