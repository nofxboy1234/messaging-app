class FriendshipsController < ApplicationController
  def requested
  end

  def pending
    @outgoing_friend_requests = Current.user.pending_friends
    @incoming_friend_requests = Current.user.requested_friends

    render inertia: "Friendships/Pending", props: {
      outgoing: @outgoing_friend_requests.map do |friend|
        serialize_friend(friend)
      end,
      incoming: @incoming_friend_requests.map do |friend|
        serialize_friend(friend)
      end
    }
  end

  def blocked
    @blocked_friends = Current.user.blocked_friends
    render inertia: "Friendships/Blocked", props: {
      blocked_friends: @blocked_friends.map do |friend|
        serialize_friend(friend)
      end
    }
  end

  def accepted
    @friends = Current.user.friends
    render inertia: "Friendships/Index", props: {
      friends: @friends.map do |friend|
        serialize_friend(friend)
      end
    }
  end

  def send_request
    @friend = User.find(friendship_params[:user_id])
    Current.user.friend_request(@friend)

    head :created
  end

  def cancel_request
    decline
  end

  def decline
    @friend = User.find(params[:user_id])
    @friend.decline_request(Current.user)

    head :ok
  end

  def accept
    @friend = User.find(params[:user_id])
    Current.user.accept_request(@friend)

    head :created
  end

  def block
    @friend = User.find(params[:user_id])
    Current.user.block_friend(@friend)

    head :ok
  end

  def unblock
    @friend = User.find(params[:user_id])
    Current.user.unblock_friend(@friend)

    head :ok
  end

  def remove
    @friend = User.find(params[:user_id])
    Current.user.remove_friend(@friend)

    head :ok
  end


  private

  def friendship_params
    params.require(:friendship).permit(:id, :user_id)
  end

  def serialize_friend(user)
    user.as_json(include: :profile)
  end
end
