class Api::CommentsController < ApplicationController
  def create
    feature = Feature.find_by(id: params[:feature_id])
    if feature.nil?
      render json: { error: "Feature not found" }, status: :not_found
      return
    end

    comment = feature.comments.build(comment_params)
    if comment.save
      render json: comment, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
