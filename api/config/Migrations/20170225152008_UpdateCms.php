<?php
use Migrations\AbstractMigration;

class UpdateCms extends AbstractMigration
{

    public function up()
    {

        $this->table('appearances')
            ->changeColumn('priority', 'integer')
            ->update();

        $this->table('configs')
            ->addColumn('visible', 'integer', [
                'default' => 1,
                'length' => 1,
                'null' => true,
            ])
            ->addColumn('front', 'integer', [
                'default' => 0,
                'length' => 1,
                'null' => false,
            ])
            ->update();

        $this->table('promotions')
            ->addColumn('short', 'string', [
                'default' => null,
                'length' => 255,
                'null' => true,
            ])
            ->update();
    }

    public function down()
    {

        $this->table('appearances')
            ->changeColumn('priority', 'integer', [
                'default' => 100,
                'length' => 10,
                'null' => false,
            ])
            ->update();

        $this->table('configs')
            ->removeColumn('visible')
            ->removeColumn('front')
            ->update();

        $this->table('promotions')
            ->removeColumn('short')
            ->update();
    }
}

