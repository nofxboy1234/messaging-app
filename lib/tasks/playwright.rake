require "database_cleaner/active_record"
require_relative "../../db/test_data"

namespace :playwright do
  task setup: :environment do
    puts "\nsetup: start"
    DatabaseCleaner.strategy = [
      :deletion,
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
    puts "setup: cleaned"
    create_test_data(true)
    puts "setup: created data with users"
  end

  task setup_test_data: :environment do
    puts "\nsetup_test_data: start"
    DatabaseCleaner.strategy = [
      :deletion,
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
    puts "setup_test_data: cleaned"
    create_test_data(true)
    puts "setup_test_data: created data with users"
  end

  task cleanup_test_data: :environment do
    puts "\ncleanup_test_data: start"
    DatabaseCleaner.strategy = [
      :deletion,
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
    puts "setup_test_data: cleaned"
  end

  task setup_test_data_except_users: :environment do
    puts "\nsetup_test_data_except_users: start"
    DatabaseCleaner.strategy = [
      :deletion, except: %w[users],
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
    puts "setup_test_data_except_users: cleaned"
    create_test_data(false)
    puts "setup_test_data_except_users: created data without users"
  end

  task cleanup_test_data_except_users: :environment do
    puts "\ncleanup_test_data_except_users: start"
    DatabaseCleaner.strategy = [
      :deletion, except: %w[users],
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
    puts "cleanup_test_data_except_users: cleaned"
  end

  task teardown: :environment do
    puts "\nteardown: start"
    DatabaseCleaner.strategy = [
      :deletion,
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
    puts "teardown: cleaned"
  end
end
