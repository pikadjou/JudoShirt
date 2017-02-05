<?php
use Migrations\AbstractSeed;

/**
 * Cms seed.
 */
class CmsSeed extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     *
     * @return void
     */
    public function run()
    {
        $data = [];

        $table = $this->table('cms');
        $table->insert($data)->save();
    }
}
