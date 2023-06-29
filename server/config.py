from dotenv import load_dotenv
import os
# import redis

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_marshmallow import Marshmallow
from flask_session import Session
from flask_cors import CORS
from flask_login import LoginManager
from flask_wtf import FlaskForm
from wtforms import SubmitField
from flask_login import login_manager
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)

app = Flask(__name__)
app.secret_key = b"Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_size": 20}
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"max_overflow": 10}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_POOL_RECYCLE"] = int(
    os.environ.get("SQLALCHEMY_POOL_RECYCLE", 300)
)
# app.config["JWT_SECRET_KEY"] = os.urandom(24)
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

app.config["SQLALCHEMY_ECHO"] = False
app.json.compact = False

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=convention)
load_dotenv()

# server_session = Session(app)
db = SQLAlchemy(metadata=metadata)
ma = Marshmallow(app)
db.init_app(app)
migrate = Migrate(app, db)
CORS(app, support_credentials=True)
bcrypt = Bcrypt(app)
login = LoginManager(app)
login_manager.session_protection = "strong"
login_manager.login_view = "login"
login_manager.login_message_category = "info"
# jwt = JWTManager(app)
api = Api(app)
