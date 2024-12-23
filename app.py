from telegram import Update, KeyboardButton, ReplyKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

# Токен бота
BOT_TOKEN = "6771074134:AAFrjUSoctJU-JLCVNMImv3svcjMQFohGqo"

# URL приложения
WEB_APP_URL = "https://soft-beignet-57ae0f.netlify.app/"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start."""
    button = KeyboardButton(text="Запустить игру 🐝", web_app=WebAppInfo(url=WEB_APP_URL))
    keyboard = [[button]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

    await update.message.reply_text(
        "Добро пожаловать в Bee Hive Empire! Нажмите кнопку ниже, чтобы начать игру.",
        reply_markup=reply_markup,
    )

def main():
    """Главная функция для запуска бота."""
    # Создание экземпляра приложения
    application = Application.builder().token(BOT_TOKEN).build()

    # Добавление обработчиков
    application.add_handler(CommandHandler("start", start))

    # Запуск бота
    application.run_polling()

if __name__ == "__main__":
    main()