<section class="content-header">
    <h1>
        Index
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
                            <?= $this->Html->link(__('Add'), 
                                ['action' => 'edit'],
                                ['class' => 'btn btn-block btn-primary']
                            ) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <?php foreach ($types as $name => $type): ?>
                                <th><?= $this->Paginator->sort($name) ?></th>
                            <?php endforeach; ?>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($datas as $data): ?>
                        <tr>
                             <?php foreach ($types as $name => $type): ?>
                            <td>
                                <?php 
                                switch ($type){
                                    case "boolean": ?>
                                        <input type="checkbox" <?php echo ($data->$name == 1) ? 'checked' : '' ?> disabled>
                                        <?php break;
                                    case "text": ?>
                                        <?php echo $this->Text->truncate($data->$name); ?>
                                        <?php break;
                                    default:
             
                                        switch ($name){
                                            case "image":
                                            case "thumbnail": 
                                            case "sizeThumbnail": ?>
                                                <img src="<?php echo $data->$name; ?>">
                                                <?php break;
                                            case "lastUpdate": ?>
                                                <?php echo date("d-m-Y H:i:s", $data->$name); ?>
                                                <?php break;
                                            default: ?>
                                                <?= h($data->$name) ?>
                                                <?php break;
                                        }

                                } ?>
                            </td>
                            <?php endforeach; ?>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['action' => 'view', $data->id]) ?>
                                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $data->id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $data->id], ['confirm' => __('Are you sure you want to delete # {0}?', $data->id)]) ?>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                    </table>
                    <div class="paginator">
                        <ul class="pagination">
                            <?= $this->Paginator->prev('< ' . __('previous')) ?>
                            <?= $this->Paginator->numbers() ?>
                            <?= $this->Paginator->next(__('next') . ' >') ?>
                        </ul>
                        <p><?= $this->Paginator->counter() ?></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>