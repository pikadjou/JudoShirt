<div class="categories index large-10 medium-9 columns">
    
    <?= $this->Html->link(__('Add'), ['action' => 'edit']) ?>
    
    <table cellpadding="0" cellspacing="0">
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
