module Api
    module V1
        class ArticlesController < ApplicationController
            before_action :setArticle, only: [:show, :destroy]
            def index
                @articles = Article.all
                render json: @articles, status: :ok
            end

            
            def create
                @article  = Article.new(article_params)
                @article.save
                render json: @article, status: :created

            end 

            private
                def setArticle
                    @artilce = Article.find(params[:id])
                end

                def article_params
                    params.require(:article).permit(:title)
                end
        end
    
    end
end