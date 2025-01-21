import requests
import re
import json
from bs4 import BeautifulSoup

response = requests.get('https://www.happyhouseplants.co.uk/blogs/houseplant-blog')
soup = BeautifulSoup(response.text, 'lxml')

articles = soup.find_all('a', class_='article__title')[:5]  # Only show the first 5 articles

def get_first_text_paragraph(content):
    if content:
        paragraphs = content.find_all('p')
        for para in paragraphs:
            if para.get_text().strip() and not para.find('img'):
                return para.get_text().strip()
    return "No text content found"

article_list = []
for article in articles:
    article_text = article.get_text().strip()
    url = f"https://www.happyhouseplants.co.uk{article['href']}"

    article_response = requests.get(url)
    article_soup = BeautifulSoup(article_response.text, 'lxml')

    content = article_soup.find('div', class_='rte')

    first_para = get_first_text_paragraph(content)

    if first_para != "No text content found":
        first_sentence = re.split('[.!?]', first_para)[0] + '.'
    else:
        first_sentence = first_para

    article_info = {
        'title': article_text,
        'sentence': first_sentence,
        'url': url
    }

    article_list.append(article_info)

with open('./components/articles.json', 'w') as f:     
    json.dump(article_list, f, indent=2)
