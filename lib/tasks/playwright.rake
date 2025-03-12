namespace :playwright do
  desc "reset the test database and load seeds"
  task setup: :environment do
    Rails.env = "test"
    Rake::Task["db:test:prepare"].invoke
    Rake::Task["db:seed"].invoke

    # Rake::Task["db:drop"].invoke
    # Rake::Task["db:create"].invoke
    # Rake::Task["db:schema:load"].invoke
    # Rake::Task["db:seed"].invoke

    # Rake::Task["db:reset"].invoke
    # Rake::Task["db:prepare"].invoke
    # Rake::Task["db:fixtures:load"].invoke
    puts "reset the test database and load seeds"
  end

  desc "prepare (clear) the test database"
  task teardown: :environment do
    Rails.env = "test"
    Rake::Task["db:test:prepare"].invoke
    # Rake::Task["db:reset"].invoke

    puts "prepare (clear) the test database"
  end
end
