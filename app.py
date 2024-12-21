from telegram import Bot, Update, KeyboardButton, ReplyKeyboardMarkup, WebAppInfo
from telegram.ext import Updater, CommandHandler

# Замените YOUR_BOT_TOKEN вашим токеном
BOT_TOKEN = "6771074134:AAFrjUSoctJU-JLCVNMImv3svcjMQFohGqo"

def start(update, context):
    chat_id = update.effective_chat.id
    web_app_url = "https://your-deployed-webapp-url.com"  # Укажите ваш URL
    button = KeyboardButton(text="Запустить игру 🐝", web_app=WebAppInfo(url=web_app_url))
    keyboard = [[button]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    
    context.bot.send_message(chat_id=chat_id, text="Добро пожаловать в Bee Hive Empire! Нажмите кнопку ниже, чтобы начать игру.", reply_markup=reply_markup)

def main():
    updater = Updater(BOT_TOKEN, use_context=True)
    dp = updater.dispatcher
    
    dp.add_handler(CommandHandler("start", start))
    
    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
