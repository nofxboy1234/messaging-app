require "database_cleaner/active_record"
require_relative "../../db/test_data"

namespace :playwright do
  task setup: :environment do
    DatabaseCleaner.strategy = [
      :deletion,
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
    create_test_data(true)
  end

  task setup_test_data: :environment do
    DatabaseCleaner.strategy = [
      :deletion, except: %w[users profiles],
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
    create_test_data(false)
  end

  task cleanup_test_data: :environment do
    DatabaseCleaner.strategy = [
      :deletion, except: %w[users profiles],
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
  end

  task teardown: :environment do
    DatabaseCleaner.strategy = [
      :deletion,
      pre_count: true,
      reset_ids: true
    ]
    DatabaseCleaner.clean
  end
end
