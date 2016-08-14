<?php
use Migrations\AbstractMigration;

class CreateTestsTable extends AbstractMigration
{
    public function change()
    {
        $table = $this
            ->table('test')
            ->addColumn('title', 'string', [
                'default' => null,
                'limit' => 255,
                'null' => false,
            ])
            ->create();
    }
}
?>