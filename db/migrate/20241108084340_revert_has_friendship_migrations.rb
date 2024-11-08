require_relative "20241025093913_add_unique_index_to_friendships.has_friendship_engine"
require_relative "20241025093912_update_friendships.has_friendship_engine"
require_relative "20241025093911_add_blocker_id_to_friendships.has_friendship_engine"
require_relative "20241025093910_create_friendships.has_friendship_engine"

class RevertHasFriendshipMigrations < ActiveRecord::Migration[7.2]
  def change
    revert AddUniqueIndexToFriendships
    revert UpdateFriendships
    revert AddBlockerIdToFriendships
    revert CreateFriendships
  end
end
