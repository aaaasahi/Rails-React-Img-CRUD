class Todo < ApplicationRecord
  mount_uploader :file, LabelUploader
end
