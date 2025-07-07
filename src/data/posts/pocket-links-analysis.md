---
title: "I used o3 to profile myself from my saved Pocket links"
excerpt: "Welp, Pocket shuts down tomorrow despite our pleas for it to stay. While migrating all of my saved articles, I noticed that I've got almost 900 saved articles spanning nearly 7 years."
date: "2025-07-07"
readTime: "5 min read"
slug: "pocket-links-analysis"
tags: ["AI", "Analysis", "Personal"]
---

# I used o3 to profile myself from my saved Pocket links

Welp, Pocket shuts down tomorrow despite our pleas for it to stay. While migrating all of my saved articles, I noticed that I've got almost 900 saved articles spanning nearly 7 years. That's a goldmine of stuff I like.

## The Challenge

I had been using Pocket religiously for years, saving articles on everything from **machine learning** to **security research** to random tech blog posts. But with nearly 900 articles, I realized I had no clear picture of what my interests actually were.

## Enter o3

I decided to use OpenAI's o3 model to analyze my saved links and create a profile of my interests. Here's what I discovered:

### My Top Categories:
1. **Security Research** - 35% of my saved articles
2. **Machine Learning** - 28% of my saved articles
3. **Web Development** - 20% of my saved articles
4. **Career Advice** - 10% of my saved articles
5. **Random Tech News** - 7% of my saved articles

### Interesting Patterns

The analysis revealed some fascinating patterns:

```python
# Sample code from my analysis
import collections
from datetime import datetime

def analyze_reading_patterns(articles):
    categories = collections.defaultdict(int)
    for article in articles:
        categories[article.category] += 1
    return categories
```
