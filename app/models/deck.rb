class Deck < ApplicationRecord
    has_many :cards, dependent: :destroy
end
