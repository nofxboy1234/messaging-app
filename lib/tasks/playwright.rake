require "database_cleaner/active_record"
require_relative "../../db/test_data"

namespace :playwright do
  task setup: :environment do
    DatabaseCleaner.strategy = [
      :truncation,
      pre_count: true

    ]
    DatabaseCleaner.clean
    create_test_data(true)
  end

  task setup_test_data: :environment do
    DatabaseCleaner.strategy = [
      :truncation,
      pre_count: true

    ]
    DatabaseCleaner.clean
    create_test_data(true)
  end

  task setup_test_data_except_users: :environment do
    DatabaseCleaner.strategy = [
      :truncation, except: %w[users],
      pre_count: true

    ]
    DatabaseCleaner.clean
    create_test_data(false)
  end

  task teardown: :environment do
    DatabaseCleaner.strategy = [
      :truncation,
      pre_count: true

    ]
    DatabaseCleaner.clean
  end
end
