"""ADDED THE IMAGE ATTRIBUTE

Revision ID: 54a6cba249a6
Revises: 53a32afa7b49
Create Date: 2024-04-05 20:48:45.956234

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54a6cba249a6'
down_revision = '53a32afa7b49'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
