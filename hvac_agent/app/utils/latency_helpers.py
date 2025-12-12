"""
Latency optimization helpers for HVAC Voice Agent.

Provides:
- Response caching for common queries
- Precomputed responses for frequent intents
- Filler phrase management
"""

import random
from typing import Optional, Dict, Any
from functools import lru_cache

# Quick responses for common intents (no AI needed)
QUICK_RESPONSES: Dict[str, str] = {
    # Greetings
    "hello": "Hi there! Need to schedule an appointment or have a question?",
    "hi": "Hi! How can I help you today?",
    "hey": "Hey! What can I do for you?",
    
    # Affirmations
    "yes": "Great! What would you like to schedule?",
    "yeah": "Perfect. What can I help you with?",
    "sure": "Okay, go ahead.",
    "okay": "Alright, I'm listening.",
    
    # Negations
    "no": "No problem. Is there anything else I can help with?",
    "nope": "Okay. Anything else?",
    "not right now": "No worries. Call back anytime!",
    
    # Common questions
    "what are your hours": "We're open Monday through Friday, 8 AM to 6 PM, and Saturday 9 AM to 2 PM.",
    "where are you located": "We serve Dallas, Fort Worth, and Arlington. Which location works for you?",
    "do you do emergency service": "Yes, we have 24/7 emergency service. Is this an emergency?",
}

# Filler phrases by context
FILLERS = {
    "default": [
        "One moment.",
        "Let me check.",
        "Sure thing.",
        "Got it.",
    ],
    "booking": [
        "Let me find a time.",
        "Checking availability.",
        "One sec.",
    ],
    "lookup": [
        "Let me look that up.",
        "Checking on that.",
    ],
}


def get_quick_response(user_text: str) -> Optional[str]:
    """
    Check if we can respond instantly without AI.
    
    Args:
        user_text: User's speech input
        
    Returns:
        Quick response if available, None otherwise
    """
    normalized = user_text.lower().strip().rstrip("?!.")
    return QUICK_RESPONSES.get(normalized)


def get_filler(context: str = "default") -> str:
    """
    Get a random filler phrase for the given context.
    
    Args:
        context: Context type (default, booking, lookup)
        
    Returns:
        Random filler phrase
    """
    phrases = FILLERS.get(context, FILLERS["default"])
    return random.choice(phrases)


def detect_booking_intent(text: str) -> bool:
    """Check if text indicates booking intent."""
    keywords = [
        "schedule", "appointment", "book", "available", 
        "time", "slot", "come out", "technician"
    ]
    text_lower = text.lower()
    return any(kw in text_lower for kw in keywords)


def detect_faq_intent(text: str) -> bool:
    """Check if text is a common FAQ."""
    faq_patterns = [
        "hours", "open", "located", "location", "address",
        "cost", "price", "how much", "emergency", "weekend"
    ]
    text_lower = text.lower()
    return any(p in text_lower for p in faq_patterns)


@lru_cache(maxsize=100)
def get_cached_faq_response(question_key: str) -> Optional[str]:
    """
    Get cached FAQ response.
    
    Uses LRU cache to avoid repeated lookups.
    """
    faqs = {
        "hours": "We're open Monday through Friday 8 AM to 6 PM, Saturday 9 to 2.",
        "locations": "We serve Dallas, Fort Worth, and Arlington.",
        "emergency": "Yes, we offer 24/7 emergency service. Is this urgent?",
        "cost": "Service calls start at $89. The technician will give you a full quote on site.",
        "weekend": "We're open Saturday 9 AM to 2 PM. Sundays are emergency only.",
    }
    return faqs.get(question_key)


def truncate_for_voice(text: str, max_words: int = 40) -> str:
    """
    Truncate text to be suitable for voice output.
    
    Args:
        text: Original text
        max_words: Maximum words to keep
        
    Returns:
        Truncated text
    """
    words = text.split()
    if len(words) <= max_words:
        return text
    
    # Find a good break point (end of sentence)
    truncated = " ".join(words[:max_words])
    
    # Try to end at a sentence boundary
    for punct in [".", "!", "?"]:
        last_punct = truncated.rfind(punct)
        if last_punct > len(truncated) // 2:
            return truncated[:last_punct + 1]
    
    return truncated + "..."
