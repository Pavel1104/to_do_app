# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4']
tasks.each{|task| Task.create(
                                name: task,
                                isDone: false,
                                deadline:Time.new.strftime("%F")
                              )}
