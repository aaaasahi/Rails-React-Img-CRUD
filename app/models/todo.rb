class Todo < ApplicationRecord
  belongs_to :user
  mount_uploader :file, LabelUploader
end
