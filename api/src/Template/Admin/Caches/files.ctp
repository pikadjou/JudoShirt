<section class="content-header">
    <h1>
        Cache File
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
                           <?= $this->Form->postLink(__('Delete'), 
                           ['action' => 'deleteFileAll'], 
                           ['confirm' => __('Are you sure you want to delete all?'),
                           'class' => 'btn btn-block btn-danger']) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Memory</th>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($caches as $key => $data): ?>
                        <tr>
                            <td>
                                <?php echo $this->Text->truncate($key); ?>
                            </td>
                            <td>
                                <?php echo $data->__memory ?>
                            </td>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['action' => 'viewFile', $key]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['action' => 'deleteFile', $key], ['confirm' => __('Are you sure you want to delete # {0}?', $key)]) ?>
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