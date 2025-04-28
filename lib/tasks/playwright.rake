require "database_cleaner/active_record"
require_relative "../../db/test_data"

namespace :playwright do
  task setup: :environment do
    DatabaseCleaner.strategy = [
      :truncation,
      pre_count: true, cache_tables: true
    ]
    DatabaseCleaner.clean
    puts "setup: Database cleaned"
    create_test_data(true)
    # Rails.application.load_seed
    puts "setup: Database seeded"
  end

  task setup_test_data: :environment do
    DatabaseCleaner.strategy = [
      :truncation, except: %w[users profiles],
      pre_count: true, cache_tables: true
    ]
    DatabaseCleaner.clean
    puts "setup_test_data: Database cleaned"
    create_test_data(false)
    # Rails.application.load_seed
    puts "setup_test_data: Database seeded"
  end

  task cleanup_test_data: :environment do
    DatabaseCleaner.strategy = [
      :truncation, except: %w[users profiles],
      pre_count: true, cache_tables: true
    ]
    DatabaseCleaner.clean
    puts "cleanup_test_data: Database cleaned"
  end

  task teardown: :environment do
    DatabaseCleaner.strategy = [
      :truncation,
      pre_count: true, cache_tables: true
    ]
    DatabaseCleaner.clean
    puts "teardown: Database cleaned"
  end
end
