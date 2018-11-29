class WelcomeController < ApplicationController
  before_action :require_login

  def index
  end

  private
    def require_login
      if current_user
        redirect_to events_path
      end
    end

end
