<section class="content-header">
    <h1>
        Migration
        <small>listes</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="#">Tables</a></li>
        <li class="active">Data tables</li>
    </ol>
</section>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3 class="box-title"></h3>
                    <div class="row">
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('Update'), 
                                ['action' => 'upgrade'],
                                ['class' => 'btn btn-block btn-primary']
                            ) ?>
                        </div>
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('downgrade'), 
                                ['action' => 'downgrade'],
                                ['class' => 'btn btn-block btn-danger']
                            ) ?>
                        </div>
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('seed'), 
                                ['action' => 'seed'],
                                ['class' => 'btn btn-block btn-warning']
                            ) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>status</th>
                            <th>missing</th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($migrations as $migration): ?>
                        <tr>
                            <td><?= $migration['id']; ?></td>
                            <td><?= $migration['name']; ?></td>
                            <td><?= $migration['status']; ?></td>
                            <td><?= (array_key_exists('missing', $migration))? $migration['missing'] : ''; ?></td>
                            <td class="actions">
                                <?= $this->Html->link(__('Mark'), ['action' => 'mark', $migration['id']]) ?>
                           </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>