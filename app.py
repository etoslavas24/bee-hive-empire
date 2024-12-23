from telegram import Update, KeyboardButton, ReplyKeyboardMarkup, WebAppInfo
from telegram.ext import Updater, CommandHandler

# Токен бота
BOT_TOKEN = "6771074134:AAFrjUSoctJU-JLCVNMImv3svcjMQFohGqo"

# URL приложения
WEB_APP_URL = "https://soft-beignet-57ae0f.netlify.app/"

def start(update, context):
    """Обработчик команды /start."""
    button = KeyboardButton(text="Запустить игру 🐝", web_app=WebAppInfo(url=WEB_APP_URL))
    keyboard = [[button]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

    update.message.reply_text(
        "Добро пожаловать в Bee Hive Empire! Нажмите кнопку ниже, чтобы начать игру.",
        reply_markup=reply_markup,
    )

def main():
    """Запуск бота."""
    updater = Updater(BOT_TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))

    updater.start_polling()
    updater.idle()

if __name__ == "__main__":
    main()
