"""adding new tables for threads

Revision ID: 8edfd437e8a5
Revises: e7ef05617de8
Create Date: 2023-06-29 14:28:01.394081

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8edfd437e8a5'
down_revision = 'e7ef05617de8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('threads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('community_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('likes', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['community_id'], ['communities.id'], name=op.f('fk_threads_community_id_communities')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_threads_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_threads'))
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('thread_id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('likes', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['thread_id'], ['threads.id'], name=op.f('fk_comments_thread_id_threads')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_comments_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_comments'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comments')
    op.drop_table('threads')
    # ### end Alembic commands ###
