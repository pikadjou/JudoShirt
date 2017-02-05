<?php
use Migrations\AbstractMigration;

class Update extends AbstractMigration
{

    public function up()
    {

        $this->table('appearances')
            ->changeColumn('priority', 'integer', [
                'default' => 100,
            ])
            ->update();

        $this->table('articles')
            ->changeColumn('extra', 'text', [
                'null' => true,
            ])
            ->changeColumn('lastUpdate', 'float', [
                'null' => true,
            ])
            ->update();

        $this->table('designs')
            ->removeColumn('lastProductsUpdate')
            ->update();

        $this->table('products')
            ->changeColumn('thumbnail', 'string')
            ->changeColumn('sizeThumbnail', 'string')
            ->update();

        $this->table('products_types')
            ->changeColumn('name', 'string', [
                'null' => true,
            ])
            ->changeColumn('content', 'text', [
                'null' => true,
            ])
            ->update();

        $this->table('sizes')
            ->changeColumn('priority', 'integer', [
                'default' => 100,
            ])
            ->update();

        $this->table('types')
            ->changeColumn('content', 'text', [
                'null' => true,
            ])
            ->update();

        $this->table('designs')
            ->addColumn('lastUpdate', 'float', [
                'default' => null,
                'length' => null,
                'null' => true,
            ])
            ->update();

        $this->table('types')
            ->addColumn('parent_id', 'integer', [
                'default' => null,
                'length' => 11,
                'null' => true,
            ])
            ->addColumn('priority', 'integer', [
                'default' => 100,
                'length' => 11,
                'null' => false,
            ])
            ->update();

    }

    public function down()
    {

        $this->table('appearances')
            ->changeColumn('priority', 'integer', [
                'default' => null,
                'length' => 10,
                'null' => false,
            ])
            ->update();

        $this->table('articles')
            ->changeColumn('extra', 'text', [
                'default' => null,
                'length' => null,
                'null' => false,
            ])
            ->changeColumn('lastUpdate', 'float', [
                'default' => null,
                'length' => null,
                'null' => false,
            ])
            ->update();

        $this->table('designs')
            ->addColumn('lastProductsUpdate', 'float', [
                'default' => null,
                'length' => null,
                'null' => true,
            ])
            ->removeColumn('lastUpdate')
            ->update();

        $this->table('products')
            ->changeColumn('thumbnail', 'string', [
                'default' => null,
                'length' => 255,
                'null' => false,
            ])
            ->changeColumn('sizeThumbnail', 'string', [
                'default' => null,
                'length' => 250,
                'null' => false,
            ])
            ->update();

        $this->table('products_types')
            ->changeColumn('name', 'string', [
                'default' => null,
                'length' => 255,
                'null' => false,
            ])
            ->changeColumn('content', 'text', [
                'default' => null,
                'length' => null,
                'null' => false,
            ])
            ->update();

        $this->table('sizes')
            ->changeColumn('priority', 'integer', [
                'default' => null,
                'length' => 10,
                'null' => false,
            ])
            ->update();

        $this->table('types')
            ->changeColumn('content', 'text', [
                'default' => null,
                'length' => null,
                'null' => false,
            ])
            ->removeColumn('parent_id')
            ->removeColumn('priority')
            ->update();
    }
}

