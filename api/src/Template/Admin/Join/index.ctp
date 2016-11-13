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
                        <div class="col-sm-3">
                            <?= $this->Html->link(__('otherVue'), 
                                ['action' => 'index', $otherView],
                                ['class' => 'btn btn-block btn-info']
                            ) ?>
                        </div>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                <?php       foreach ($joins[1]->structure as $name => $type): 
                ?>              <th><?= $this->Paginator->sort($name) ?></th>
                <?php       endforeach;
                            $diff = count($joins[2]->structure) - count($joins[1]->structure);
                            $memDiff = $diff;
                            while($diff > 0){ 
                ?>
                                 <th></th>
                <?php
                                $diff--;
                            }
                            $diff = $memDiff;
                ?>
                            <th class="actions"><?= __('Actions') ?></th>
                        </tr>
                        <tr>
                            <th></th>
                            <?php foreach ($joins[2]->structure as $name => $type): ?>
                                <th><?php echo $name ?></th>
                            <?php endforeach; ?>
                        </tr>
                    </thead>
                    <tbody>
                    <?php $lastIdParent = null;
                        foreach ($datas as $data): ?>
                        <?php 
                        if($lastIdParent != $data[$joins[1]->joinalias]->id) : ?>
                        <tr>
                            <?php 
                            $dataJoin = $data[$joins[1]->joinalias];
                            foreach ($joins[1]->structure as $name => $type): ?>
                                <td>
                                    <?php 
                                    if($type == null){
                                        echo $dataJoin->$name;
                                    } else{
                                        switch ($type){
                                            case "boolean": ?>
                                                <input type="checkbox" <?php echo ($dataJoin->$name == 1) ? 'checked' : '' ?> disabled>
                                                <?php break;
                                            case "text": ?>
                                                <?php echo $this->Text->truncate($dataJoin->$name); ?>
                                                <?php break;
                                            default:

                                                switch ($name){
                                                    case "image":
                                                    case "thumbnail": 
                                                    case "sizeThumbnail": ?>
                                                        <img src="<?php echo $dataJoin->$name; ?>">
                                                        <?php break;
                                                    default: ?>
                                                        <?= h($dataJoin->$name) ?>
                                                        <?php break;
                                                }

                                        }
                                    }
                                     ?>
                                </td>
                            <?php endforeach;
                            while($diff > 0){ 
                ?>
                                <td></td>
                <?php
                                $diff--;
                            }
                            $diff = $memDiff;
                ?>
                            <td class="actions">
                                <?= $this->Html->link(__('View'), ['action' => 'view', $mainView, $dataJoin->id]) ?>
                                <?= $this->Html->link(__('Edit'), ['action' => 'edit', $data->id]) ?>
                                <?= $this->Form->postLink(__('Delete'), ['action' => 'delete', $data->id], ['confirm' => __('Are you sure you want to delete # {0}?', $data->id)]) ?>
                            </td>
                        </tr>
                        <?php endif; ?>
                        <tr>
                            <td></td>
                            <?php 
                            $dataJoin = $data[$joins[2]->joinalias];
                            foreach ($joins[2]->structure as $name => $type): ?>
                                <td>
                                    <?php 
                                    if($type == null){
                                        echo $dataJoin->$name;
                                    } else{
                                        switch ($type){
                                            case "boolean": ?>
                                                <input type="checkbox" <?php echo ($dataJoin->$name == 1) ? 'checked' : '' ?> disabled>
                                                <?php break;
                                            case "text": ?>
                                                <?php echo $this->Text->truncate($dataJoin->$name); ?>
                                                <?php break;
                                            default:

                                                switch ($name){
                                                    case "image":
                                                    case "thumbnail": 
                                                    case "sizeThumbnail": ?>
                                                        <img src="<?php echo $dataJoin->$name; ?>">
                                                        <?php break;
                                                    default: ?>
                                                        <?= h($dataJoin->$name) ?>
                                                        <?php break;
                                                }

                                        }
                                    }
                                     ?>
                                </td>
                            <?php endforeach; ?>
                        </tr>
                        <?php $lastIdParent = $data[$joins[1]->joinalias]->id; ?>
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