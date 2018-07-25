class Api::V1::ArticlesController < ApplicationController

    def index
        @articles = Article.all
        render json: @articles, status: :ok
    end

    def create
        @article = Article.new(article_params)
        @article.save
        render json: @article, status: :created

    end
    
    def destroy
        @article = Article.where(id: params[:id]).first
        if @article.destroy
            head(:ok)
        else
            head(:notok)
        end
    end

    private 
        def article_params
            params.require(:article).permit(:title, :category)
        end
end
