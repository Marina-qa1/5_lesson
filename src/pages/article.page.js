import { test } from '@playwright/test';

export class ArticlePage{
    constructor(page){
    this.page = page;

this.newArticleTitle =  page.getByRole('textbox', { name: 'Article Title' });
this.shortTextInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
this.descriptionInput = page.getByRole('textbox', { name: 'Write your article (in' });
this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });

this.commentTextbox = page.getByRole('textbox', { name: 'Write a comment...' });
this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });

this.deleteButton = page.getByRole('button', { name: 'Delete Article' })
                               .or(page.locator('.btn-outline-danger'))
                               .first();
// Локаторы для статей
this.firstArticle = page.locator('.article-preview').first();
this.articleTitle = page.locator('h1').first();
this.readMoreButton = page.locator('a').filter({ hasText: /read more|читать/i });
this.articleCards = page.locator('.article-preview');
        
// Локаторы для страницы статьи
this.articleTitlePage = page.locator('[data-testid="article-title"]');
this.articleContent = page.locator('[data-testid="article-content"]');
this.articleMeta = page.locator('[data-testid="article-meta"]');
        
// Локаторы из метода clickFirstArticle()
this.articleTitleInList = this.firstArticle.locator('h1'); // Заголовок статьи в списке
this.readMoreLink = this.readMoreButton; // Уже есть выше, можно использовать

        
// Альтернативные локаторы
this.alternativeArticleCard = page.locator('.article-card, .news-item, .post-preview').first();

}

async actionNewArticle(newArticle1) {
        const { title, shortText, description, tags} = newArticle1;
            
            await this.newArticleTitle.click();
            await this.newArticleTitle.fill(title);
            await this.shortTextInput.click();
            await this.shortTextInput.fill(shortText);
            await this.descriptionInput.click(); 
            await this.descriptionInput.fill(description); 
            await this.tagsInput.click();
            await this.tagsInput.fill(tags);
            await this.publishArticleButton.click();
       
}

async getFirstArticle() {
        await this.firstArticle.waitFor({ state: 'visible' });
        return {
            title: await this.firstArticle.locator('h1').textContent(),
            description: await this.firstArticle.locator('p').textContent(),
            element: this.firstArticle
        };
    }

async clickFirstArticle() {
        
        // Получим заголовок статьи для отладки
        const articleTitle = await this.articleTitleInList.textContent();
        console.log('Кликаем на статью:', articleTitle);
        
        await this.firstArticle.click();
        
        // Ждем загрузки 
        await this.page.waitForLoadState('networkidle');
        
    }

async transferProfile() {

		await this.navigationLogin.click();
        await this.profile.click();
	} 

async writeComment(commentText) {
        const {newCommentText} = commentText;
        await this.commentTextbox.click();
        await this.commentTextbox.fill(newCommentText);
        await this.postCommentButton.click();
    }



}
  