"""follow features

Revision ID: 8f6e0758ed7e
Revises: 60de847a54f5
Create Date: 2023-06-26 15:42:17.960889

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f6e0758ed7e'
down_revision = '60de847a54f5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('followers',
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('followed_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['followed_id'], ['users.id'], name=op.f('fk_followers_followed_id_users')),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], name=op.f('fk_followers_follower_id_users'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('followers')
    # ### end Alembic commands ###
