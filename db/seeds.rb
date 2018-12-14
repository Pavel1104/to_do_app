# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def generate_color
  arr = [(0..9), ('A'..'F')].map(&:to_a).flatten
  color = '#' + (0...6).map { arr[rand(arr.length)] }.join
end

Task.all.each{|task| task.destroy} if Task.count > 0
Project.all.each {|project| project.destroy} if Project.count > 0

projects = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5',]
projects.each {|item| Project.create(
  name:  item,
  color: generate_color,
)}

project_ids = Project.pluck :id
tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5']
tasks.each{|task| Task.create(
                                name:       task,
                                isDone:     false,
                                deadline:   Time.new.strftime("%F"),
                                project_id: project_ids[rand(project_ids.length)],
                              )}
