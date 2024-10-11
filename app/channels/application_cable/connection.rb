module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      if verified_user = Current.user
        puts "*** backend verified actioncable connection"
        verified_user
      else
        puts "*** backend rejected actioncable connection"
        reject_unauthorized_connection
      end
    end
  end
end
